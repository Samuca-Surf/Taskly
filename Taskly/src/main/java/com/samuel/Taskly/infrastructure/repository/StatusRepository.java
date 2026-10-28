package com.samuel.Taskly.infrastructure.repository;

import com.samuel.Taskly.domain.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StatusRepository extends JpaRepository<Status, Long> {
    @Modifying
    @Query("delete from Status s where s.projeto.id = :projetoId")
    void deleteByProjetoId(@Param("projetoId") Long projetoId);
}
