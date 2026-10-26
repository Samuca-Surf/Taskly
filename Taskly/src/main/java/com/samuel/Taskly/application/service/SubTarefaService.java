package com.samuel.Taskly.application.service;

import com.samuel.Taskly.application.dto.SubTarefaDTO;
import com.samuel.Taskly.application.usecase.ISubTarefaUseCase;
import com.samuel.Taskly.domain.entity.SubTarefa;
import com.samuel.Taskly.domain.exception.RecursoNaoEncontrado;
import com.samuel.Taskly.infrastructure.repository.SubTarefaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


@Service
public class SubTarefaService implements ISubTarefaUseCase {
    private final SubTarefaRepository repository;
    private final TarefaService service;

    public SubTarefaService(SubTarefaRepository repository, TarefaService service) {
        this.repository = repository;
        this.service = service;
    }

    @Override
    public List<SubTarefa> listarSubtarefas(Long idTarefa) {
        return repository.findByTarefaIdOrderByCriadoEmAsc(idTarefa);
    }

    @Override
    public SubTarefa buscarPorId(Long id) {
        return repository.findById(id).orElseThrow(() -> new RecursoNaoEncontrado("Subtarefa não encontrada"));
    }

    @Override
    public SubTarefa criarSubTarefa(SubTarefaDTO dto) {
        SubTarefa subTarefa = new SubTarefa();
        subTarefa.setTitulo(dto.titulo());
        subTarefa.setTarefa(service.buscarTarefaPorId(dto.id_tarefa()));
        subTarefa.setPosicao(dto.posicao());
        subTarefa.setCompletado(dto.completado());
        subTarefa.setCriadoEm(LocalDateTime.now());
        repository.save(subTarefa);
        return subTarefa;
    }

    @Override
    public SubTarefa atualizarSubTarefa(Long id, SubTarefaDTO dto) {
        SubTarefa subTarefa = buscarPorId(id);
        subTarefa.setTarefa(service.buscarTarefaPorId(dto.id_tarefa()));
        subTarefa.setTitulo(dto.titulo());
        subTarefa.setCompletado(dto.completado());
        subTarefa.setPosicao(dto.posicao());
        subTarefa.setAtualizadoEm(LocalDateTime.now());
        repository.save(subTarefa);
        return subTarefa;
    }

    @Override
    public void deletarSubTarefa(Long id) {
        SubTarefa subTarefa = buscarPorId(id);
        repository.delete(subTarefa);
    }
}
