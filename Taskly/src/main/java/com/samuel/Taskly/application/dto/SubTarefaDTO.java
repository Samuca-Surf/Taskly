package com.samuel.Taskly.application.dto;

public record SubTarefaDTO(
        Long id_tarefa,
        String titulo,
        Boolean completado,
        Integer posicao
) {
}
