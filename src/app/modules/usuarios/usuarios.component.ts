import { Usuario } from '@/models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '@services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  
  usuariosList: Usuario[] = [];
  displayStyle = 'none';
  btnSaveShow: boolean = true;
  btnUpdateShow: boolean = false;
  usuariosForm = new FormGroup({
    nombres: new FormControl(null, Validators.required),
    apellidos: new FormControl(null, Validators.required),
    direccion: new FormControl(null, Validators.required),
    telefono: new FormControl(null, Validators.required),
  })
  usuarioId: number;

  constructor(private usuarioService: UsuariosService) { }

  ngOnInit(): void {
    this.getUsuarios()
  }

  getUsuarios() {
    this.usuarioService.getAll()
      .subscribe((data: Usuario[]) => {
        this.usuariosList = data;
        console.log(this.usuariosList);
        
      })
  }

  add() {
    if (this.usuariosForm.valid) {  
      const nuevoUsuario: Usuario = {
        'nombres': this.usuariosForm.value.nombres,
        'apellidos': this.usuariosForm.value.apellidos,
        'direccion': this.usuariosForm.value.direccion,
        'telefono': this.usuariosForm.value.telefono,
    }
    
    this.usuarioService.save(nuevoUsuario)
      .subscribe((usuario:Usuario) => {
        this.usuariosForm.reset();
        this.getUsuarios();
        alert('Usuario Registrado')
      })
      this.closePopup();
    }  
  }

  update(){
    const usuario: Usuario = {
      'id': this.usuarioId,
      'nombres': this.usuariosForm.value.nombres,
      'apellidos': this.usuariosForm.value.apellidos,
      'direccion': this.usuariosForm.value.direccion,
      'telefono': this.usuariosForm.value.telefono,
     
    }

    if (usuario !== null) {
      this.usuarioService.update(usuario['id'], usuario)
        .subscribe(() => {
          alert('Usuario Actualizado');
          this.getUsuarios();
        })
      this.usuariosForm.reset();
    }

    this.showSave();
    this.closePopup();
  }

  edit(row: Usuario) {
    this.usuarioId = row.id; 
    this.usuariosForm.controls['nombres'].setValue(row.nombres);
    this.usuariosForm.controls['apellidos'].setValue(row.apellidos);
    this.usuariosForm.controls['direccion'].setValue(row.direccion);
    this.usuariosForm.controls['telefono'].setValue(row.telefono);

    this.openPopup();
    this.showUpdate();
  }
  
  delete(row: Usuario) {
    this.usuarioService.delete(row.id)
      .subscribe(()=> {
        alert('Usuario Eliminado');
        this.getUsuarios();
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
    this.usuariosForm.reset();
  }
}
