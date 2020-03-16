import { Injectable } from '@angular/core';
import {Appointment } from '../../tablas/usuarios/usuario';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  bookingListRef: AngularFireList<any>;
  bookingRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase, private firebase:AngularFireDatabase) { 
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
