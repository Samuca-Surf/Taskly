package com.samuel.Taskly.application.service;

import com.samuel.Taskly.application.dto.CategoriaDTO;
import com.samuel.Taskly.application.usecase.ICategoriaUseCase;
import com.samuel.Taskly.domain.entity.Categoria;
import com.samuel.Taskly.domain.entity.Projeto;
import com.samuel.Taskly.domain.exception.RecursoNaoEncontrado;
import com.samuel.Taskly.infrastructure.repository.CategoriaRepository;
import com.samuel.Taskly.infrastructure.repository.ProjetoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService implements ICategoriaUseCase {
    private final CategoriaRepository repository;
    private final ProjetoRepository projetoRepository;

    public CategoriaService(CategoriaRepository repository, ProjetoRepository projetoRepository) {
        this.repository = repository;
        this.projetoRepository = projetoRepository;
    }

    private Categoria toModel(CategoriaDTO dto){
        Categoria categoria = new Categoria();

        Projeto projeto = projetoRepository.findById(dto.idProjeto()).orElseThrow(() -> new
                RecursoNaoEncontrado("ID do projeto não encontrado")
        );

        categoria.setProjeto(projeto);
        categoria.setHexColor(dto.hexColor());
        categoria.setNome(dto.nome());
        return categoria;
    }


    @Override
    public List<Categoria> listarCategoria() {
        return repository.findAll();
    }

    private Categoria findId(Long id){
         return repository.findById(id).orElseThrow(() -> new RecursoNaoEncontrado("ID de categoria não encontrado"));
    }

    @Override
    public Categoria buscarPorId(Long id) {
        return findId(id);
    }

    @Override
    public Categoria criarCategoria(CategoriaDTO dto) {
        return repository.save(toModel(dto));
    }

    @Override
    public Categoria atualizarCategoria(Long id, CategoriaDTO dto) {
        Categoria categoria = findId(id);
        categoria.setNome(dto.nome());
        categoria.setHexColor(dto.hexColor());
        repository.save(categoria);
        return categoria;
    }

    @Override
    public void deletarCategoria(Long id) {
        Categoria categoria = findId(id);
        repository.delete(categoria);
    }
}
