import Ticket from '@/app/services/ticket';
import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#__addToCart') // replace with your app element id

export default function AddTicketToCartModal({ticket}: {ticket: Ticket}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <h2>{ticket.name}</h2>
        <p>{ticket.description}</p>
        <p>Price: {ticket.price}</p>
        <p>Quantity left: {ticket.amount}</p>
        <input name='ticketAmount' type="number" />
        <p>Total: {ticket.price * ticket.amount}</p>
        <button>Add to cart</button>
        <button onClick={closeModal}>close</button>
      </Modal>
    </div>
  );
}