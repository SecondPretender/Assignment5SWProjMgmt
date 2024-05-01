from datetime import datetime
from datetime import timedelta

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
import time

DATABASE_URL = "mysql+mysqlconnector://root:supersecretpassw0rd@mysql/sakila"


app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Howdy"}

@app.get("/getFilms")
def getFilms():
    engine = create_engine(DATABASE_URL)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    session = SessionLocal()

    try:
        result = session.execute(text("""
            SELECT film_id, title, description FROM film
        """))
        films = [{"film_id": row[0], "title": row[1], "description": row[2]} for row in result]
        return films
    finally:
        session.close()

@app.post("/rentFilms")
async def rentFilms(req: Request):
    engine = create_engine(DATABASE_URL)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    session = SessionLocal()

    data = await req.json()

    customerID = data.get('customerID')
    filmID = data.get('selectedFilm')
    createDate = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    rentDate = (datetime.now() + timedelta(days=5)).strftime("%Y-%m-%d %H:%M:%S")
    try:
       result = session.execute(text("""
      INSERT INTO rental (rental_date, inventory_id, customer_id, return_date, staff_id)
       VALUES (:createDate, :filmID, :customerID, :rentDate, 1)
        """), dict(createDate=createDate, filmID=filmID, customerID=customerID, rentDate=rentDate))
    finally:
        session.close()
    return await req.json()


@app.post("/addCustomers")
async def addCustomers(req: Request):
    engine = create_engine(DATABASE_URL)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)



    session = SessionLocal()

    data = await req.json()

    customerID = data.get('customerID')
    storeID = data.get('storeID')
    firstName = data.get('firstName')
    lastName = data.get('lastName')
    email = data.get('email')
    addressID = data.get('addressId')
    createDate = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    try:
       result = session.execute(text("""
       INSERT INTO customer (customer_id ,store_id, first_name, last_name, email, address_id, create_date)
        VALUES (:customerID, :storeID, :firstName, :lastName, :email, :addressID, :createDate)
       """), dict(customerID=customerID ,storeID=storeID, firstName=firstName, lastName=lastName, email=email, addressID=addressID, createDate=createDate))
    finally:
        session.close()
    return await req.json()


@app.get("/getCanadianCustomers")
def getCanadianCustomers():
    engine = create_engine(DATABASE_URL)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    session = SessionLocal()
    try:
        result = session.execute(text("""
            SELECT customer.first_name, customer.last_name, customer.email, city.city
            FROM customer
            JOIN address ON customer.address_id = address.address_id
            JOIN city ON address.city_id = city.city_id
            JOIN country ON city.country_id = country.country_id
            WHERE country.country = 'Canada'
            ORDER BY city.city
        """))
        customers = [{"first_name": row[0], "last_name": row[1], "email": row[2], "city": row[3]} for row in result]
        return customers
    finally:
        session.close()
        
        