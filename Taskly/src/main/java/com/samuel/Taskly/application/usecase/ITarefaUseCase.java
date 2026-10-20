package com.samuel.Taskly.application.usecase;

import com.samuel.Taskly.application.dto.TarefaDTO;
import com.samuel.Taskly.domain.entity.Tarefa;

import java.util.List;

public interface ITarefaUseCase {
    List<Tarefa> listarTarefas();
    Tarefa buscarTarefaPorId(Long id);
    Tarefa criarTarefa(TarefaDTO dto);
    Tarefa atualizarTarefa(Long id, TarefaDTO dto);
    void deletarTarefa(Long id);
}
