package com.homebasket.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.homebasket.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
