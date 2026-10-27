package com.samuel.Taskly.application.dto;

import com.samuel.Taskly.domain.entity.Prioridade;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record TarefaDTO(
        @NotNull(message = "Coloque o id do projeto")
        Long id_projeto,
        @NotNull(message = "Coloque o id de categoria")
        Long id_categoria,
        @NotNull(message = "Coloque o id do status")
        Long id_status,
        @NotEmpty(message = "Coloque o titulo da tarefa")
        String titulo,
        @NotEmpty(message = "Coloque a descrição")
        String descricao,
        @NotNull(message = "Coloque o nivel de prioridade da tarefa")
        Prioridade prioridade,
        LocalDate data_final,
        @NotNull(message = "Atribua uma posição da tarefa")
        Integer posicao
) {
}
