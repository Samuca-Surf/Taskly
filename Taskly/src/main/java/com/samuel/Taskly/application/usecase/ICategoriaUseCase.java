package com.samuel.Taskly.application.usecase;

import com.samuel.Taskly.application.dto.CategoriaDTO;
import com.samuel.Taskly.domain.entity.Categoria;

import java.util.List;

public interface ICategoriaUseCase {
    List<Categoria> listarCategoria();
    Categoria buscarPorId(Long id);
    Categoria criarCategoria(CategoriaDTO dto);
    Categoria atualizarCategoria(Long id, CategoriaDTO dto);
    void deletarCategoria(Long id);
}
