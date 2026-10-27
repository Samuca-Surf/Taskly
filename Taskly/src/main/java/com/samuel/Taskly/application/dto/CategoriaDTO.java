package com.samuel.Taskly.application.dto;

import com.samuel.Taskly.domain.entity.Projeto;
import jakarta.validation.constraints.NotEmpty;

public record CategoriaDTO(
        Long idProjeto,
        @NotEmpty(message = "Nome da categoria não pode estar vazia")
         String nome,
        String hexColor
) {
}
