package com.samuel.Taskly.infrastructure.repository;

import com.samuel.Taskly.domain.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    Optional<Categoria> findByNomeContainingIgnoreCase(String nome);

    @Modifying
    @Query("delete from Categoria c where c.projeto.id = :projetoId")
    void deleteByProjetoId(@Param("projetoId") Long projetoId);
}
