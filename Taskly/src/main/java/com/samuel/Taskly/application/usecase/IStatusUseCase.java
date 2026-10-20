package com.samuel.Taskly.application.usecase;

import com.samuel.Taskly.application.dto.StatusDTO;
import com.samuel.Taskly.domain.entity.Status;

import java.util.List;

public interface IStatusUseCase {
    List<Status> listarStatus();
    Status buscarPorIdDoStatus(Long id);
    Status criarStatus(StatusDTO dto);
    Status atualizarStatus (Long id, StatusDTO dto);
    void deletarStatus(Long id);
}
