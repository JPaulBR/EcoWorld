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
  listaUsuario: AngularFirestoreCollection<Appointment>;
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
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      }
    ));
    return usuarios;
  }
  /*getUserById(id:number){
    var valor = false;
    this.db2.collection("usuario", ref => ref.where('id', '==', id)).get().toPromise().then(function(querySnapshot){
      querySnapshot.forEach(function(doc) {
        console.log(doc.id, " => ", doc.data().apellido);
        valor = true;
      });
    });
    return valor;
  }*/

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


  createUser(apt: Appointment) {
    this.bookingListRef = this.firebase.list('/usuario');
    return this.bookingListRef.push({
      id: apt.id,
      nombre: apt.nombre,
      apellido: apt.apellido,
      email: apt.email,
      contra: apt.contra,
      url: apt.urlFoto
    })
  }

  // Get List
  getBookingList() {
    this.bookingListRef = this.db.list('/usuario');
    return this.bookingListRef;
  }

  // Update
  updateBooking(id, apt: Appointment) {
    return this.bookingRef.update({
      nombre: apt.nombre,
      apellido: apt.apellido,
      email: apt.email,
      contra: apt.contra
    })
  }

  // Delete
  deleteBooking(id: string) {
    this.bookingRef = this.db.object('/usuario/' + id);
    this.bookingRef.remove();
  }

}
