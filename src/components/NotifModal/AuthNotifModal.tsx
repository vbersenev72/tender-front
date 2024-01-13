import * as React from 'react';
import { useState } from 'react';
import './AuthNotifModal.css'

export function AuthNotifModal({ isOpen, closeModal, children }: any) {

  if (!isOpen) {
    return null;
  }

  return (
    <div>
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content">
          <div>
            <p style={{fontSize:"18px"}}>Письмо с паролем направлено на вашу почту.</p>
            <br />
            <a href="/auth" className="blue-link">
              Авторизоваться
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
