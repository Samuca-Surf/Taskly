package com.samuel.Taskly.application.usecase;

import com.samuel.Taskly.application.dto.SubTarefaDTO;
import com.samuel.Taskly.domain.entity.SubTarefa;

import java.util.List;

public interface ISubTarefaUseCase {
    List<SubTarefa> listarSubtarefas(Long idTarefa);
    SubTarefa buscarPorId(Long id);
    SubTarefa criarSubTarefa(SubTarefaDTO dto);
    SubTarefa atualizarSubTarefa(Long id, SubTarefaDTO dto);
    void deletarSubTarefa(Long id);
}
