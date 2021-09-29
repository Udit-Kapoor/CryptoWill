#Crypto Will Second Draft
import smartpy as sp

class CryptoWill(sp.Contract):
    def __init__(self):
        self.init(
            willsBal = sp.big_map(
                tkey =sp.TAddress,
                tvalue = sp.TMutez), 

            #Big Map for User : Will
            wills = sp.big_map(
                tkey = sp.TAddress, # User's Address
                tvalue = sp.TRecord(
                owner = sp.TAddress,
                amount=sp.TMutez,       #Will amount
                reciever=sp.TAddress,  #Reciever may del later

                resetDays = sp.TNat, #Days to extend will #TNAT      
                endTime=sp.TTimestamp,   #Will Timer

                hash = sp.TBytes)),
            deposits = sp.tez(0))



    # Params = secret ,reciever, resetDays 
    @sp.entry_point
    def originate(self , params):
        sp.verify((self.data.willsBal.contains(sp.sender))==False , message = "User Already Has an Existing Will")
        self.data.deposits+=sp.amount
        
        #Adding New User
        self.data.wills[sp.sender] = sp.record(
        owner = sp.sender,
        amount=sp.amount,       #Will amount
        reciever=params.reciever,  #Reciever 
    

        resetDays=params.resetDays, 
        endTime= sp.now.add_days(sp.to_int(params.resetDays)),

        hash = params.secret)         #Secret Key already hashed

        #adding to willsBal
        self.data.willsBal[sp.sender] = sp.amount


    @sp.entry_point
    def add(self):
        #Checks
        sp.verify(self.data.willsBal.contains(sp.sender) , message = "User Will Does Not Exist")
        sp.verify(self.data.wills[sp.sender].owner == sp.sender , "Wrong Owner" )

        # someBytes = sp.pack(secret)
        # hashed = sp.sha256(someBytes)
        # sp.verify(self.data.wills[sp.sender].hash == hashed , message =" Wrong Secret Key")

        #Processing Amount
        self.data.deposits+=sp.amount

    
        self.data.wills[sp.sender].amount += sp.amount
        self.data.wills[sp.sender].endTime = sp.now.add_days(sp.to_int(self.data.wills[sp.sender].resetDays))
         
        self.data.willsBal[sp.sender] +=sp.amount

    @sp.entry_point
    def withdraw(self , amt):
        #Checks
        sp.verify(self.data.willsBal.contains(sp.sender) , message = "User Will Does Not Exist")
        sp.verify(self.data.wills[sp.sender].owner == sp.sender , "Wrong Owner" )
        sp.if sp.amount != sp.mutez(0):
            sp.send(sp.sender , sp.amount)

        # someBytes = sp.pack(secret)
        # hashed = sp.sha256(someBytes)
        # sp.verify(self.data.wills[sp.sender].hash == hashed , message =" Wrong Secret Key")
        #Processing amount
        sp.verify(self.data.wills[sp.sender].amount >= amt , "Insuffcient Funds")
        
        sp.send(self.data.wills[sp.sender].owner , amt)
        self.data.wills[sp.sender].amount -= amt
        self.data.deposits-=amt
        
        #Update Endtime
        self.data.wills[sp.sender].endTime = sp.now.add_days(sp.to_int(self.data.wills[sp.sender].resetDays)) 

        #Update willsBal
        self.data.willsBal[sp.sender] -=amt

    @sp.entry_point
    def transfer(self , owner , secret):
        sp.verify(self.data.willsBal.contains(owner) , message = "User Will Does Not Exist")
        sp.verify(self.data.wills[owner].reciever == sp.sender , "Wrong Reciever" )
        sp.if sp.amount != sp.mutez(0):
            sp.send(sp.sender , sp.amount)

    
        hashed = sp.sha256(secret)
        sp.verify(self.data.wills[owner].hash == hashed , message= " Wrong Secret Key")

        sp.verify(self.data.wills[owner].endTime <= sp.now , message="Time Limit Not Yet Expired")

        #Processing amount
        sp.verify(self.data.wills[owner].amount >= sp.mutez(0) , "No Funds Left")
    

        sp.send(self.data.wills[owner].reciever , self.data.wills[owner].amount)
        self.data.deposits-=self.data.wills[owner].amount
        self.data.wills[owner].amount = sp.mutez(0)
        

        self.data.willsBal[owner] = sp.mutez(0)

    @sp.entry_point
    def onlyTime(self):
        #Checks
        sp.verify(self.data.willsBal.contains(sp.sender) , message = "User Will Does Not Exist")
        sp.verify(self.data.wills[sp.sender].owner == sp.sender , "Wrong Owner" )
        sp.if sp.amount != sp.mutez(0):
            sp.send(sp.sender , sp.amount)

        self.data.wills[sp.sender].endTime= sp.now.add_days(sp.to_int(self.data.wills[sp.sender].resetDays))

    @sp.entry_point
    def updateTime(self  , newDays):
        #Checks
        sp.verify(self.data.willsBal.contains(sp.sender) , message = "User Will Does Not Exist")
        sp.verify(self.data.wills[sp.sender].owner == sp.sender , "Wrong Owner" )
        sp.if sp.amount != sp.mutez(0):
            sp.send(sp.sender , sp.amount)

        # someBytes = sp.pack(secret)
        # hashed = sp.sha256(someBytes)
        # sp.verify(self.data.wills[sp.sender].hash == hashed , message= " Wrong Secret Key")

        self.data.wills[sp.sender].resetDays = newDays
        self.data.wills[sp.sender].endTime = sp.now.add_days(sp.to_int(self.data.wills[sp.sender].resetDays)) 
        



    @sp.entry_point
    def updateSecret(self , newSecret):
        #Checks
        sp.verify(self.data.willsBal.contains(sp.sender) , message = "User Will Does Not Exist")
        sp.verify(self.data.wills[sp.sender].owner == sp.sender , "Wrong Owner" )
        sp.if sp.amount != sp.mutez(0):
            sp.send(sp.sender , sp.amount)

        # someBytes = sp.pack(secret)
        # hashed = sp.sha256(someBytes)
        # sp.verify(self.data.wills[sp.sender].hash == hashed , message= " Wrong Secret Key")
        self.data.wills[sp.sender].hash = newSecret
    
    @sp.entry_point
    def delWill(self):
        #Checks
        sp.verify(self.data.willsBal.contains(sp.sender) , message = "User Will Does Not Exist")
        sp.verify(self.data.wills[sp.sender].owner == sp.sender , "Wrong Owner" )
        sp.if sp.amount != sp.mutez(0):
            sp.send(sp.sender , sp.amount)

        sp.send(self.data.wills[sp.sender].owner , self.data.wills[sp.sender].amount)
        self.data.deposits-= self.data.wills[sp.sender].amount   
        self.data.wills[sp.sender].amount = sp.mutez(0)

        del self.data.wills[sp.sender]
        del self.data.willsBal[sp.sender]

    
    @sp.entry_point
    def updateReciever(self , newReciever):
        #Checks
        sp.verify(self.data.willsBal.contains(sp.sender) , message = "User Will Does Not Exist")
        sp.verify(self.data.wills[sp.sender].owner == sp.sender , "Wrong Owner" )
        sp.if sp.amount != sp.mutez(0):
            sp.send(sp.sender , sp.amount)

        self.data.wills[sp.sender].reciever = newReciever
        

        

    

@sp.add_test("CryptoWill")
def test():
    
    scenario = sp.test_scenario()
    scenario.h1("Crypto Will")
    scenario.table_of_contents()
    

    #Users
    admin = sp.test_account("Administrator") #Is admin needed?
    udit = sp.test_account("Udit")
    bob = sp.test_account("Bob")
    wendy = sp.test_account("Wendy")

    #Creating Contract Instance
    c = CryptoWill()
    scenario += c

    scenario.h1("Workflows")

    scenario.h2("Making new Will")
    # Params = secret ,reciever, resetDays
    s="pie"
    someBytes = sp.pack(s)
    hashed = sp.sha256(someBytes)
    
    params= sp.record(reciever = bob.address , secret=hashed, resetDays=5)      

    scenario += c.originate(params).run(sender=udit , amount=sp.tez(2))

    s="smart"
    someBytes = sp.pack(s)
    hashed = sp.sha256(someBytes)
    params2= sp.record(reciever = bob.address , secret=hashed , resetDays=1)
    scenario += c.originate(params2).run(sender=wendy , amount=sp.tez(10))


    scenario.h2("Adding Money to will")
    #Failing Conditions
    # scenario+= c.add(secret="p").run(sender= bob , amount=sp.tez(3) , valid=False)
    # scenario+= c.add(secret="p").run(sender= wendy , amount=sp.tez(3) , valid=False)
    # scenario+= c.add(secret="p").run(sender= udit , amount=sp.tez(3) , valid=False)
    
    scenario+= c.add().run(sender= udit , amount = sp.tez(3))
    scenario+= c.add().run(sender = wendy , amount = sp.mutez(50))

    scenario.h2("Withdrawing Money from Will")
    #Failing Conditions
    # scenario+= c.withdraw(amt= sp.tez(10) , secret="pie").run(sender=udit , valid=False)
    # scenario+= c.withdraw(amt= sp.tez(1) , secret="p").run(sender=udit , valid= False)
    # scenario+= c.withdraw(amt= sp.tez(1) , secret="pie").run(sender=bob , valid = False)
    # scenario+= c.withdraw(amt= sp.tez(1) , secret="pie").run(sender=wendy , valid=False)

    scenario += c.withdraw(sp.tez(1)).run(sender=udit )
    scenario += c.withdraw(sp.mutez(500)).run(sender=wendy)


    scenario.h2("Updating EndTime")
    #failing Conditions
    # scenario+= c.updateTime(secret="p" , newDays=2).run(sender=udit , valid=False)

    scenario+= c.updateTime(2).run(sender=udit)
    scenario += c.updateTime(30).run(sender=wendy)


    scenario.h2("Updating Secret")
    #Failing Conditions
    # scenario+= c.updateSecret(secret="p" , newSecret= "newpie").run(sender=udit , valid=False)

    s="newpie"
    someBytes = sp.pack(s)
    hashed = sp.sha256(someBytes)
    scenario+= c.updateSecret(hashed).run(sender=udit ,amount = sp.tez(2))

    # scenario+= c.updateSecret(secret="pie" , newSecret= "newpie").run(sender=udit , valid=False)
    s="pie"
    someBytes = sp.pack(s)
    hashed = sp.sha256(someBytes)
    scenario+= c.updateSecret(hashed).run(sender=udit)

    scenario.h2("Claiming Will")
    #Failing Conditions
    s="pie"
    b = sp.pack(s) 
    e="smart"
    d= sp.pack(e)
    scenario+= c.transfer(owner = wendy.address , secret=b).run(sender=bob , valid=False) #wrong owner
    scenario+= c.transfer(owner = wendy.address , secret=d).run(sender=udit , valid=False) # wrong reciever
    scenario+= c.transfer(owner = wendy.address , secret=d).run(sender=bob , valid=False) # wrong secret
    scenario+= c.transfer(owner = udit.address , secret=b).run(sender=bob , valid=False) #Timelimit Not Expired

    #Test Passing Condition when time limit expires
    s="pie"
    b = sp.pack(s) 
    scenario+= c.transfer(owner = udit.address , secret=b).run(sender=bob, now=sp.timestamp_from_utc_now().add_days(3) )


    scenario.h2("Updating Reciever")

    scenario+= c.updateReciever(wendy.address).run(sender = udit)

    scenario.h2("Deleting will")

    scenario += c.delWill().run(sender=wendy)

    
    
