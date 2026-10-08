package com.samuel.Taskly.application.usecase;

import com.samuel.Taskly.application.dto.ProjetoDTO;
import com.samuel.Taskly.domain.entity.Projeto;

import java.util.List;

public interface IProjetoUseCase {
    List<Projeto> listarTodosOsProjetos();
    Projeto buscarPorIdDoPreojeto(Long id);
    Projeto criarProjeto(ProjetoDTO dto);
    Projeto atualizarProjeto(Long id, ProjetoDTO dto);
    void deletarProjeto(Long id);
}
