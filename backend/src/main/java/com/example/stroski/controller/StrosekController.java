package com.example.stroski.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.stroski.Strosek;
import com.example.stroski.repository.StrosekRepository;

import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.CrossOrigin;
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
@RestController
@RequestMapping("/api/stroski")
public class StrosekController {

    private final StrosekRepository repository;

    public StrosekController(StrosekRepository repository) {
        this.repository = repository;
    }

    // funkcija read za vse
    @GetMapping
    public List<Strosek> vsiStroski() {
        return repository.findAll();
    }


    // filtriranje stroškov po kategoriji
    @GetMapping("/filter")
    public List<Strosek> filtrirajPoKategoriji(
            @RequestParam String kategorija) {
        return repository.findByKategorijaIgnoreCase(kategorija);
    }


    // funkcija read za eno stvar
    @GetMapping("/{id}")
    public ResponseEntity<Strosek> enStrosek(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // funkcija create
    @PostMapping
    public ResponseEntity<Strosek> dodajStrosek(
            @RequestBody Strosek strosek) {
        Strosek shranjen = repository.save(strosek);
        return ResponseEntity.status(HttpStatus.CREATED).body(shranjen);
    }

    // funkcija update
    @PutMapping("/{id}")
    public ResponseEntity<Strosek> posodobiStrosek(
            @PathVariable Long id,
            @RequestBody Strosek podatki) {

        Optional<Strosek> obstojeci = repository.findById(id);

        if (obstojeci.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Strosek strosek = obstojeci.get();
        strosek.setOpis(podatki.getOpis());
        strosek.setZnesek(podatki.getZnesek());
        strosek.setKategorija(podatki.getKategorija());
        strosek.setDatum(podatki.getDatum());

        return ResponseEntity.ok(repository.save(strosek));
    }

    // funkcija delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> izbrisiStrosek(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
