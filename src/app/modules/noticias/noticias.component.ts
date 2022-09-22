import { Noticia } from '@/models/noticia.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NoticiasService } from '@services/noticias.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss']
})
export class NoticiasComponent implements OnInit {

  noticiasList: Noticia[] = [];
  displayStyle = 'none';
  btnSaveShow: boolean = true;
  btnUpdateShow: boolean = false;
  noticiasForm = new FormGroup({
    titulo: new FormControl(null, Validators.required),
    cuerpo: new FormControl(null, Validators.required),
  })
  noticiaId: number;

  constructor(private noticiaService: NoticiasService) { }

  ngOnInit(): void {
    this.getNoticias();
  }

  getNoticias() {
    this.noticiaService.getAll()
      .subscribe((data: Noticia[]) => {
        this.noticiasList = data;
        console.log(this.noticiasList);
        
      })
  }

  add() {
    if (this.noticiasForm.valid) {  
      const nuevo: Noticia = {
        'titulo': this.noticiasForm.value.titulo,
        'cuerpo': this.noticiasForm.value.cuerpo,
    }
    
    this.noticiaService.save(nuevo)
      .subscribe((noticia:Noticia) => {
        this.noticiasForm.reset();
        this.getNoticias();
        alert('Noticia Registrado')
      })
      this.closePopup();
    }  
  }

  update(){
    const actual: Noticia = {
      'id': this.noticiaId,
      'titulo': this.noticiasForm.value.titulo,
      'cuerpo': this.noticiasForm.value.cuerpo,
      
    }

    if (actual !== null) {
      this.noticiaService.update(actual['id'], actual)
        .subscribe(() => {
          alert('Noticia Actualizado');
          this.getNoticias();
        })
      this.noticiasForm.reset();
    }

    this.showSave();
    this.closePopup();
  }

  edit(row: Noticia) {
    this.noticiaId = row.id; 
    this.noticiasForm.controls['titulo'].setValue(row.titulo);
    this.noticiasForm.controls['cuerpo'].setValue(row.cuerpo);
    
    this.openPopup();
    this.showUpdate();
  }
  
  delete(row: Noticia) {
    this.noticiaService.delete(row.id)
      .subscribe(()=> {
        alert('Noticia Eliminada');
        this.getNoticias();
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
    this.noticiasForm.reset();
  }

}
