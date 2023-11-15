import { useState } from 'react'
import './App.css'
import { ReactPropTypes } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { edadValidator } from './validators'

export const Formulario = () => {
  const {register,formState:{errors},watch,handleSubmit,} = useForm(
    {defaultValues: {
      sexo: 'h',
    }}
  )

  const onSubmit = (data) =>{
    console.log(data)
  }

  const incluirTelefono = watch('incluirTelefono')

  return (
    <div className='container'>
      <h2 className='title'>Ingresa tus datos</h2>
      <form className='form-group' onSubmit={handleSubmit(onSubmit)}>
        <div className='input-container'>
          <input className='input-field' type='text' placeholder='Nombre' {...register('nombre',{
            required:true,
            maxLength: 10,
          })}/>
          {errors.nombre?.type === 'required' && <p className='error-message'>El campo es requerido</p>}
          {errors.nombre?.type === 'maxLength' && <p className='error-message'>El nombre no puede tener mas de 10 caracteres</p>}
        </div>
        <div className='input-container'>
          <input className='input-field' type='text' placeholder='Email' {...register('email',{
            required:true,
            pattern: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
            })}/>
            {errors.email?.type === 'required' && <p className='error-message'>El campo es requerido</p>}
            {errors.email?.type === 'pattern' && <p className='error-message'>El formato de email es incorrecto</p>}
        </div>
        <div className='input-container'>
          <input className='input-field' type='text' placeholder='Direccion' {...register('direccion',{
            required:true
            })}/>
        </div>
        <div className='input-container'>
          <input className='input-field' type='text' placeholder='Edad' {...register('edad',{
            required:true,
            validate: edadValidator
            })}/>
            {errors.edad && <p className='error-message'>La edad tiene que ser entre 18 y 65</p>}
        </div>
        <div className='input-container'>
          <select className='select-field' placeholder='Sexo' {...register('sexo',{required:true})}>
            <option value='h'>Hombre</option>
            <option value='f'>Mujer</option>
            <option value='x'>X</option>
          </select>
        </div>
        <div className='input-container'>
          <label className='label'>Incluir telefono?</label>
          <div className='checkbox-field'>
            <input type='checkbox' {...register('incluirTelefono')}/>
          </div>
        </div>
        {incluirTelefono && (
          <div className='input-container'>
            <input className='input-field' type='text' placeholder='Telefono' {...register('telefono')}/>
          </div>
        )}
        <input className='submit-button' type='submit' value='Enviar' />
      </form>
    </div>
  );
};