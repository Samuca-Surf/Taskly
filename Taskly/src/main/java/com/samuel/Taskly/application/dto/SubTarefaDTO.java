package com.samuel.Taskly.application.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;

public record SubTarefaDTO(
        Long id_tarefa,
        @NotEmpty(message = "O titulo não pode estar vazio")
        String titulo,
        Boolean completado,
        @Min(0)
        Integer posicao
) {
}
