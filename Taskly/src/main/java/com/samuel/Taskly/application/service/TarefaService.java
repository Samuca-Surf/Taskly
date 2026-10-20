package com.samuel.Taskly.application.service;

import com.samuel.Taskly.application.dto.TarefaDTO;
import com.samuel.Taskly.application.usecase.ITarefaUseCase;
import com.samuel.Taskly.domain.entity.Tarefa;
import com.samuel.Taskly.domain.exception.RecursoNaoEncontrado;
import com.samuel.Taskly.infrastructure.repository.TarefaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TarefaService implements ITarefaUseCase {
    private final TarefaRepository repository;
    private final ProjetoService projetoService;
    private final CategoriaService categoriaService;
    private final StatusService statusService;

    public TarefaService(TarefaRepository repository, ProjetoService projetoService, CategoriaService categoriaService, StatusService statusService) {
        this.repository = repository;
        this.projetoService = projetoService;
        this.categoriaService = categoriaService;
        this.statusService = statusService;
    }

    @Override
    public List<Tarefa> listarTarefas() {
        return repository.findAll();
    }

    @Override
    public Tarefa buscarTarefaPorId(Long id) {
        return repository.findById(id).orElseThrow(() -> new RecursoNaoEncontrado("ID da tarefa não encontrado"));
    }

    @Override
    public Tarefa criarTarefa(TarefaDTO dto) {
        Tarefa tarefa = new Tarefa();
        tarefa.setProjeto(projetoService.buscarPorIdDoPreojeto(dto.id_projeto()));
        tarefa.setCategoria(categoriaService.buscarPorId(dto.id_categoria()));
        tarefa.setStatus(statusService.buscarPorIdDoStatus(dto.id_status()));
        tarefa.setTitulo(dto.titulo());
        tarefa.setDescricao(dto.descricao());
        tarefa.setPrioridade(dto.prioridade());
        tarefa.setData_final(dto.data_final());
        tarefa.setPosicao(dto.posicao());
        tarefa.setCriado_em(LocalDateTime.now());
        return repository.save(tarefa);
    }

    @Override
    public Tarefa atualizarTarefa(Long id, TarefaDTO dto) {
        Tarefa tarefa = buscarTarefaPorId(id);
        tarefa.setProjeto(projetoService.buscarPorIdDoPreojeto(dto.id_projeto()));
        tarefa.setCategoria(categoriaService.buscarPorId(dto.id_categoria()));
        tarefa.setStatus(statusService.buscarPorIdDoStatus(dto.id_status()));
        tarefa.setTitulo(dto.titulo());
        tarefa.setDescricao(dto.descricao());
        tarefa.setPrioridade(dto.prioridade());
        tarefa.setData_final(dto.data_final());
        tarefa.setPosicao(dto.posicao());
        //tarefa.setCriado_em();
        tarefa.setAtualizado_em(LocalDateTime.now());
        return repository.save(tarefa);
    }

    @Override
    public void deletarTarefa(Long id) {
        repository.delete(buscarTarefaPorId(id));
    }
}
