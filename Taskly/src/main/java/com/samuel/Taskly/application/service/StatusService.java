package com.samuel.Taskly.application.service;

import com.samuel.Taskly.application.dto.StatusDTO;
import com.samuel.Taskly.application.usecase.IStatusUseCase;
import com.samuel.Taskly.domain.entity.Status;
import com.samuel.Taskly.domain.exception.RecursoNaoEncontrado;
import com.samuel.Taskly.infrastructure.repository.StatusRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatusService implements IStatusUseCase{
    private final StatusRepository repository;
    private final ProjetoService service;

    public StatusService(StatusRepository repository, ProjetoService service) {
        this.repository = repository;
        this.service = service;
    }

    @Override
    public List<Status> listarStatus() {
        return repository.findAll();
    }

    private Status pegarId(Long id){
        return repository.findById(id).orElseThrow(() -> new RecursoNaoEncontrado("ID do status não encontrado"));
    }

    @Override
    public Status buscarPorIdDoStatus(Long id) {
        return pegarId(id);
    }

    @Override
    public Status criarStatus(StatusDTO dto) {
        Status status = new Status();
        status.setNome(dto.nome());
        status.setHexCor(dto.hexCor());
        status.setPosicao(dto.posicao());
        status.setProjeto(service.buscarPorIdDoPreojeto(dto.id_projeto()));
        return repository.save(status);
    }

    @Override
    public Status atualizarStatus(Long id, StatusDTO dto) {
        Status status = buscarPorIdDoStatus(id);
        status.setPosicao(dto.posicao());
        status.setHexCor(dto.hexCor());
        status.setNome(dto.nome());
        status.setProjeto(service.buscarPorIdDoPreojeto(dto.id_projeto()));
        return repository.save(status);
    }

    @Override
    public void deletarStatus(Long id) {
        repository.delete(buscarPorIdDoStatus(id));
    }
}
