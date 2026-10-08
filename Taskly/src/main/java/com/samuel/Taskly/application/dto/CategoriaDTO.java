package com.samuel.Taskly.application.dto;

import com.samuel.Taskly.domain.entity.Projeto;

public record CategoriaDTO(
        Long idProjeto,
        String nome,
        String hexColor
) {
}
