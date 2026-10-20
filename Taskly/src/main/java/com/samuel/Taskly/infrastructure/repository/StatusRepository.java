package com.samuel.Taskly.infrastructure.repository;

import com.samuel.Taskly.domain.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusRepository extends JpaRepository<Status, Long> {

}
