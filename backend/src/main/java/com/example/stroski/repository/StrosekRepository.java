
package com.example.stroski.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.stroski.Strosek;
import java.util.List;

public interface StrosekRepository
        extends JpaRepository<Strosek, Long> {

    List<Strosek> findByKategorijaIgnoreCase(String kategorija);
}
