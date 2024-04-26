from fastapi import FastAPI, Request
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
import time

DATABASE_URL = "mysql+mysqlconnector://root:supersecretpassw0rd@mysql/sakila"


app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Howdy"}

@app.put("/addCustomers/")
async def addCustomers(req: Request):
    engine = create_engine(DATABASE_URL)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    session = SessionLocal()
    customer = await req.json();
    storeID = customer.get("storeID")
    firstName = customer.get("firstName")
    lastName = customer.get("lastName")
    email = customer.get("email")
    addressID = customer.get("addressID")
    createDate = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    try:
        result = session.execute(text("""
        INSERT INTO customer (store_id, first_name, last_name, email, address_id, create_date) 
        VALUES (:storeID, :firstName, :lastName, :email, :addressID, :createDate)
        """), storeID=storeID, firstName=firstName, lastName=lastName, email=email, addressID=addressID, createDate=createDate)
    finally:
        session.close()


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
        
        