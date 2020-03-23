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
    db2.collection("usuario").get().toPromise().then(function(querySnapshot){
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data().apellido);
      });
    });
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
    return this.usuarios;
  }

  getUsuario(id: string){
    return this.listaUsuarios.doc<Appointment>(id).valueChanges();
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
      contra: apt.contra
    })
  }

  // Get Single
  getUser(id: string) {
    this.bookingRef = this.db.object('/usuario/' + id);
    return this.bookingRef;
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
