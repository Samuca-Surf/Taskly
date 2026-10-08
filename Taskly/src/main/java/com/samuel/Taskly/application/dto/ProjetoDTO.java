package com.samuel.Taskly.application.dto;

import jakarta.validation.constraints.NotEmpty;

public record ProjetoDTO(
        @NotEmpty(message = "O nome do projeto não pode ser vazio")
        String nome,
        String descricao
) {
}
