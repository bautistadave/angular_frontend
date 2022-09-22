import { Categoria } from '@/models/categoria.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriasService } from '@services/categorias.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {

  categoriasList: Categoria[] = [];
  displayStyle = 'none';
  btnSaveShow: boolean = true;
  btnUpdateShow: boolean = false;
  categoriasForm = new FormGroup({
    nombre: new FormControl(null, Validators.required),
    descripcion: new FormControl(null, Validators.required),
  })
  categoriaId: number;

  constructor(private categoriaService: CategoriasService) { }

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias() {
    this.categoriaService.getAll()
      .subscribe((data: Categoria[]) => {
        this.categoriasList = data;
        console.log(this.categoriasList);
        
      })
  }

  add() {
    if (this.categoriasForm.valid) {  
      const nuevo: Categoria = {
        'nombre': this.categoriasForm.value.nombre,
        'descripcion': this.categoriasForm.value.descripcion,
    }
    
    this.categoriaService.save(nuevo)
      .subscribe((categotia:Categoria) => {
        this.categoriasForm.reset();
        this.getCategorias();
        alert('Categoria Registrado')
      })
      this.closePopup();
    }  
  }

  update(){
    const actual: Categoria = {
      'id': this.categoriaId,
      'nombre': this.categoriasForm.value.nombre,
      'descripcion': this.categoriasForm.value.descripcion,
      
    }

    if (actual !== null) {
      this.categoriaService.update(actual['id'], actual)
        .subscribe(() => {
          alert('Categoria Actualizado');
          this.getCategorias();
        })
      this.categoriasForm.reset();
    }

    this.showSave();
    this.closePopup();
  }

  edit(row: Categoria) {
    this.categoriaId = row.id; 
    this.categoriasForm.controls['nombre'].setValue(row.nombre);
    this.categoriasForm.controls['descripcion'].setValue(row.descripcion);
    
    this.openPopup();
    this.showUpdate();
  }
  
  delete(row: Categoria) {
    this.categoriaService.delete(row.id)
      .subscribe(()=> {
        alert('Categoria Eliminada');
        this.getCategorias();
      })
  }

  showSave(){
    this.btnSaveShow = true
    this.btnUpdateShow = false 
  }
  showUpdate() {
    this.btnSaveShow = false
    this.btnUpdateShow = true
  }

  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
    this.categoriasForm.reset();
  }

}
