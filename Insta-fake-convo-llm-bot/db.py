from sqlalchemy import create_engine, Column, Integer, String, Boolean, TIMESTAMP
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
from sqlalchemy import desc

class PaymentsManager:
    def __init__(self, db_url):
        self.engine = create_engine(db_url)
        self.Session = sessionmaker(bind=self.engine)
        self.Base = declarative_base()

        class Payments(self.Base):
            __tablename__ = 'payments'
            id = Column(Integer, primary_key=True)
            customer_username = Column(String)
            seller_username = Column(String)
            payment_timestamp = Column(TIMESTAMP, default=datetime.now)
            session_start_timestamp = Column(TIMESTAMP)
            session_start = Column(Boolean)
            amount = Column(Integer)

            def to_dict(self):
                return {
                    "id": self.id,
                    "customer_username": self.customer_username,
                    "seller_username": self.seller_username,
                    "payment_timestamp": self.payment_timestamp.isoformat(),
                    "session_start_timestamp": self.session_start_timestamp.isoformat(),
                    "session_start": self.session_start,
                    "amount": self.amount
                }

        self.Payments = Payments
        self.Base.metadata.create_all(self.engine)
    
    def create_payment(self, customer_username, seller_username, session_start=False, amount=None):
        new_payment = self.Payments(
            customer_username=customer_username,
            seller_username=seller_username,
            session_start=session_start,
            amount=amount
        )
        session = self.Session()
        session.add(new_payment)
        session.commit()
        session.close()

    def start_session(self, payment_id, timestamp):
        session = self.Session()
        payment_to_update = session.query(self.Payments).get(payment_id)
        if payment_to_update:
            payment_to_update.session_start_timestamp = timestamp
            payment_to_update.session_start = True
            session.commit()
        session.close()
    
    def update_payment(self, payment_id, session_start, amount):
        session = self.Session()
        payment_to_update = session.query(self.Payments).get(payment_id)
        if payment_to_update:
            payment_to_update.session_start = session_start
            payment_to_update.amount = amount
            session.commit()
        session.close()
    
    def read_payments(self):
        session = self.Session()
        payments = session.query(self.Payments).all()
        session.close()
        return payments
    
    def get_latest_payment(self, client_username, customer_username):
        session = self.Session()
        latest_payment = session.query(self.Payments).filter(
            (self.Payments.customer_username == customer_username),
            (self.Payments.seller_username == client_username)
        ).order_by(desc(self.Payments.payment_timestamp)).first()
        session.close()
        return latest_payment

#Example usage
# if __name__ == "__main__":
#     DATABASE_URL = "postgresql://atuclbul:8DQaxv8fGAJ_gmY2a4QmKSfBpHN45KoC@rajje.db.elephantsql.com/atuclbul"
    
#     payments_manager = PaymentsManager(DATABASE_URL)
    
#     payments_manager.create_payment("apekshawwwww", "rip_ballball", False)
#     #payments_manager.create_payment("user2", "user1", False)
    
#     #payments_manager.update_payment(1, False)
    
#     payments = payments_manager.read_payments()
#     for payment in payments:
#         print(payment.id, payment.customer_username, payment.seller_username, payment.timestamp, payment.session_start)
