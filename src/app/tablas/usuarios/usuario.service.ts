import { Injectable } from '@angular/core';
import {Appointment } from '../../tablas/usuarios/usuario';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import {AngularFirestore,AngularFirestoreCollection} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  bookingListRef: AngularFireList<any>;
  bookingRef: AngularFireObject<any>;
  listaUsuarios: AngularFirestoreCollection<Appointment>;
  usuarios: Observable<Appointment[]>;

  constructor(private db: AngularFireDatabase,private firebase:AngularFireDatabase,private db2: AngularFirestore) { 
    this.listaUsuarios = db2.collection<Appointment>('usuario');
    this.usuarios = this.listaUsuarios.snapshotChanges().pipe(map(
      actions=>{
        return actions.map(a =>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      }
    ));
  }

  addcomments(msj:any){
    var listaComentarios = this.db2.collection<any>('comentarios');
    return listaComentarios.add(msj);
  }

  getComments(){
    return this.db2.collection<any>('comentarios').snapshotChanges().pipe(map(
      actions=>{
        return actions.map(a =>{
          const data = a.payload.doc.data() as any;
          const key = a.payload.doc.id;
          return {key, ...data};
        });
      }
    ));
  }

  getUsers(){
    return this.db2.collection<Appointment>('usuario').snapshotChanges().pipe(map(
      actions=>{
        return actions.map(a =>{
          const data = a.payload.doc.data() as Appointment;
          const key = a.payload.doc.id;
          return {key, ...data};
        });
      }
    ));
  }

  getUserByEmail(email:string){
    var listaUsuarios = this.db2.collection<any>('usuario',ref => ref.where('email', '==', email));
    var usuarios = listaUsuarios.snapshotChanges().pipe(map(
      actions=>{
        return actions.map(a =>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      }
    ));
    return usuarios;
  }

  getUserById(id:number){
    var listaUsuarios = this.db2.collection<any>('usuario',ref => ref.where('id', '==', id));
    var usuarios = listaUsuarios.snapshotChanges().pipe(map(
      actions=>{
        return actions.map(a =>{
          const data = a.payload.doc.data() as Appointment;
          const key = a.payload.doc.id;
          return {key, ...data};
        });
      }
    ));
    return usuarios;
  }

  getUserByCredential(email:string,password:string){
    var listaUsuarios = this.db2.collection<any>('usuario',ref => ref.where('email', '==', email).where('contra', '==', password));
    var usuarios = listaUsuarios.snapshotChanges().pipe(map(
      actions=>{
        return actions.map(a =>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      }
    ));
    return usuarios;
  }

  addUser(apt:Appointment){
    return this.listaUsuarios.add(apt);
  }

  updateUser(apt:any, id:string){
    return this.listaUsuarios.doc(id).update(apt);
  }

  deleteUser(id:string){
    return this.listaUsuarios.doc(id).delete();
  }

  deletePoints(email:string){
    var listaUsuariosConPuntos = this.db2.collection<any>('puntosXusuario');
    return listaUsuariosConPuntos.doc(email).delete();
  }

  createUser(apt: Appointment) {
    this.bookingListRef = this.firebase.list('/usuario');
    return this.bookingListRef.push({
      nombre: apt.nombre,
      apellido: apt.apellido,
      email: apt.email,
      contra: apt.contra,
      url: apt.urlFoto,
      permiso: apt.permiso,
      reciclado: 0
    })
  }

  getUserByEmail2(email: string){
    return this.db2.collection<Appointment>('usuario',ref => ref.where('email', '==', email)).snapshotChanges().pipe(map(
      actions=>{
        return actions.map(a =>{
          const data = a.payload.doc.data() as Appointment;
          const key = a.payload.doc.id;
          return {key, ...data};
        });
      }
    ));
  }

  createPointsForUser(ide:number) {
    var lista = this.db2.collection<any>('puntosXusuario');
    var update = {
      id: ide,
      cantAluminio: 0,
      cantBateria: 0,
      cantPaper: 0,
      cantPlastico: 0,
      cantTetra: 0,
      cantVidrio:0,
      acumulado: 0
    };
    return lista.add(update);
  }

  getUserByIdForPoints(id:string){
    return this.db2.collection<any>('puntosXusuario',ref => ref.where('id', '==', id)).snapshotChanges().pipe(map(
      actions=>{
        return actions.map(a =>{
          const data = a.payload.doc.data();
          const key = a.payload.doc.id;
          return {key, ...data};
        });
      }
    ));
  }

  updatePointForUser(id:string,update:any){
    var lista = this.db2.collection<any>('puntosXusuario');
    return lista.doc(id).update(update);
  }

  getUserByOrder(){
    return this.db2.collection<any>('usuario',ref => ref.orderBy('reciclado','desc').where("reciclado",">",0).limit(50)).snapshotChanges().pipe(map(
      actions=>{
        return actions.map(a =>{
          const data = a.payload.doc.data() as Appointment;
          const key = a.payload.doc.id;
          return {key, ...data};
        });
      }
    ));
  }

}
