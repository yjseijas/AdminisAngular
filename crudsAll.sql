sp_helptext spAddEditCuenta

CREATE procedure spAddEditCuenta (@idCuenta int,@descripcion varchar(50),@recibe bit,@ajusta bit,@idtipo int,@activo bit) as            
--yjs 060519,030619  
if exists (select descripcion from cuentas where idCuenta = @idCuenta)        
begin        
 update cuentas set descripcion = @descripcion,recibeasientos = @recibe,ajustable = @ajusta,idTipoCuenta = @idtipo,activo = @activo  
  where idCuenta = @idCuenta      
 return        
end;         
insert into cuentas (descripcion,recibeasientos,ajustable,idTipocuenta,activo) values (@descripcion,@recibe,@ajusta,@idtipo,@activo)        
return 


SELECT TOP 1000 [idEmployee]
      ,[fullName]
      ,[email]
      ,[mobile]
      ,[city]
      ,[gender]
      ,[department]
      ,[hireDate]
      ,[isPermanent]
  FROM [pruebas].[dbo].[Employee]
  
sp_helptext spAddEditBanco  

CREATE procedure spAddEditBanco (@idBanco int,@descripcion varchar(50),@cuit varchar(20)) as      
--yjs 260419  
if exists (select descripcion from bancos where idBanco = @idBanco)  
begin  
 update bancos set descripcion = @descripcion,numerocuit = @cuit where idBanco = @idBanco  
 return  
end;   
declare @nextcod as int  
select @nextcod= max(idbanco) from bancos  
set @nextcod = @nextcod + 1  
insert into bancos (idBanco,descripcion,numerocuit) values (@nextcod,@descripcion,@cuit)  


  sp_helptext spAddEditEmployee
  
  CREATE procedure spAddEditEmployee (@idEmp int,@fullname varchar(50),@email varchar(20),@mobile varchar(50),    
 @city varchar(50), @gender int,@department int ,@hiredate varchar(50),@ispermanent bit)  as          
--yjs 270519      
if exists (select fullname from employee where idEmployee = @idEmp)      
begin      
 update employee set fullname = @fullname,email = @email,mobile = @mobile,city = @city,gender = @gender,    
 department = @department,hiredate = @hiredate,ispermanent = @ispermanent     
 where idEmployee = @idEmp    
 return      
end;       
--declare @nextcod as int      
--select @nextcod= max(idbanco) from bancos      
--set @nextcod = @nextcod + 1      
insert into employee (fullname,email,mobile,city,gender,department,hiredate,ispermanent) values     
 (@fullname,@email,@mobile,@city,@gender,@department,@hiredate,@ispermanent)      