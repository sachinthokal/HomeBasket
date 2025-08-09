package com.homebasket.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.homebasket.Model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
