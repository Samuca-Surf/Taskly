package com.samuel.Taskly.application.service;

import com.samuel.Taskly.application.dto.ProjetoDTO;
import com.samuel.Taskly.application.usecase.IProjetoUseCase;
import com.samuel.Taskly.domain.entity.Projeto;
import com.samuel.Taskly.domain.exception.RecursoNaoEncontrado;
import com.samuel.Taskly.infrastructure.repository.ProjetoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProjetoService implements IProjetoUseCase{
    private final ProjetoRepository repository;

    public ProjetoService(ProjetoRepository repository) {
        this.repository = repository;
    }

    private Projeto toModel(ProjetoDTO dto){
        Projeto projeto = new Projeto();
        projeto.setNome(dto.nome());
        projeto.setDescricao(dto.descricao());
        return projeto;
    }

    @Override
    public List<Projeto> listarTodosOsProjetos() {
        return repository.findAll();
    }

    @Override
    public Projeto buscarPorIdDoPreojeto(Long id) {
        return repository.findById(id).orElseThrow(() -> new RecursoNaoEncontrado("ID do projeto não encontrado!"));
    }

    @Override
    public Projeto criarProjeto(ProjetoDTO dto) {
        Projeto projeto = toModel(dto);
        projeto.setCriado_em(LocalDateTime.now());
        repository.save(projeto);
        return projeto;
    }

    @Override
    public Projeto atualizarProjeto(Long id, ProjetoDTO dto) {
        Projeto projeto = buscarPorIdDoPreojeto(id);
        projeto.setNome(dto.nome());
        projeto.setDescricao(dto.descricao());
        projeto.setAtualizado_em(LocalDateTime.now());
        repository.save(projeto);
        return projeto;
    }

    @Override
    public void deletarProjeto(Long id) {
        Projeto projeto = buscarPorIdDoPreojeto(id);
        repository.delete(projeto);
    }
}
