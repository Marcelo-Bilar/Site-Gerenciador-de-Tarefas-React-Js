import React, { useState } from 'react';
import logo from '../assets/icones/logo.svg';
import mail from '../assets/icones/mail.svg';
import lock from '../assets/icones/lock.svg';
import { Input } from '../componentes/Input';
import { executaRequisicao } from '../services/api';

export const Cadastro = props => {
    const [nome, setnome] = useState('');
    const [email, setemail] = useState('');
    const [senha, setSenha] = useState('');
    const [msgErro, setmsgErro] = useState('');
    const [msgSucesso, setmsgSucesso] = useState('');
    const [isLoading, setLoading] = useState(false);


    const executaCadastro = async evento => {
        try{
            evento.preventDefault(); 
            setLoading(true);
            setmsgErro('');
        
            const body = {
                nome,
                email,
                senha
            }
        
            const resultado = await executaRequisicao('usuario', 'post', body);
            // O que o cadastro devolve
            // Por enquanto vou deixar desse jeito
            if(resultado){
                setmsgSucesso('Usuário cadastrado com sucesso! ');
            }

            } catch(e){
                console.log(e);
                if(e?.response?.data?.erro){
                    setmsgErro(e.response.data.erro);
                } else {
                    setmsgErro('Não foi possível efetuar o cadastro, fale com o administrador');
                }
            }
            setLoading(false);
        }

    return(
        <div className={'container-login '+'container-cadastro'}>
            <img 
                src={logo}
                alt='Logo Devaria'
                className='logo'
            />
            <form>
                <h1>Cadastrar</h1>
                {msgErro && <p>{msgErro}</p>}
                <Input 
                    srcImg={mail}
                    altImg={'Icone email'}
                    inputType='text'
                    inputName='nome'
                    inputPlaceholder='Informe seu nome'
                    value={nome}
                    setValue={setnome}
                />
                <Input 
                    srcImg={mail}
                    altImg={'Icone email'}
                    inputType='text'
                    inputName='email'
                    inputPlaceholder='Informe seu email'
                    value={email}
                    setValue={setemail}
                />
                <Input 
                    srcImg={lock}
                    altImg={'Icone senha'}
                    inputType='password'
                    inputName='senha'
                    inputPlaceholder='Informe sua senha'
                    value={senha}
                    setValue={setSenha}
                />

                <button onClick={executaCadastro} disabled={isLoading}>{isLoading === true ? 'Carregando' : 'Cadastrar'} </button>
                {msgSucesso && <p className='sucesso'>{msgSucesso}</p>}
                <a className='link' href="http://localhost:3000/login">Já é cadastrado? Clique aqui</a>
            </form>
        </div>
    );
}