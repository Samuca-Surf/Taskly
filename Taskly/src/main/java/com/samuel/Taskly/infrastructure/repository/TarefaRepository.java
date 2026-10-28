package com.samuel.Taskly.infrastructure.repository;

import com.samuel.Taskly.domain.entity.Tarefa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TarefaRepository extends JpaRepository<Tarefa, Long> {
    @Modifying
    @Query("delete from Tarefa t where t.projeto.id = :projetoId")
    void deleteByProjetoId(@Param("projetoId") Long projetoId);
}
