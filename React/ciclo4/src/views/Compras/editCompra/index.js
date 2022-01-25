import axios, { Axios } from "axios";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react/cjs/react.development";
import { Container, Form, Button, Input, Label, FormGroup, Alert } from "reactstrap";
import { api } from "../../../config";

export const EditarCompra = (props) => {
    // objeto que recebe os dados, a variavel serviço recebe os dados e a variavel setServico
    // altera os dados

    const [id, setId] = useState(props.match.params.id);

    const [compra, setCompra] = useState({
        data: '',
        ClienteId: ''
    });

    // objeto para o tratamento de erros
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setCompra({
        // o servico vai ser composto pelo nome do campo e pelo valor do campo
        ...compra, [e.target.name]: e.target.value
    });

    const editCompra = async e => {
        // preventDefault não permite que as informações passadas no formulario
        // apareçam na barra de endereço
        e.preventDefault()
       

        // const headers é conteudo no formato json
        const headers = {
            'Content-Type': 'application/json'
        }
        // "/servicos" é a rota igual está no controller
        await axios.put(api + "/atualizarCompra/" + id, compra, { headers })
            .then(() => {
                setStatus({
                    type: 'success',
                    message: 'Compra alterada com sucesso!'
                })
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API'
                })
            })

    }

    return (
        <Container>
            <div className="d-flex">
                <div className="m-auto p-2">
                    <h1>Editar Compra</h1>
                </div>
                <div className="p-2">
                    <Link to="/listar-compras" className="btn btn-outline-success btn-sm">Voltar para Compras</Link>
                </div>
            </div>
            <hr className="m-1" />
            {/* {status.type === 'error'} serve para mostrar a mensagem na tela se deu tudo certo ou se deu erro , funciona como um if */}
            {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
            {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}
            <Form className="p-2" onSubmit={editCompra}>
                <FormGroup className="p-2">
                    <Label>Data da Compra</Label>
                    {/* onChange vai capturar o valor quando o campo for alterado */}
                    <Input name="data" placeholder="Data da Compra" type="text" onChange={valorInput} />
                </FormGroup>
                <FormGroup className="p-2">
                    <Label>ID do Cliente</Label>
                    <Input name="ClienteId" placeholder="Identificação do Cliente" type="text" onChange={valorInput} />
                </FormGroup>
                <Button type="submit" outline color="success">Atualizar</Button>
            </Form>
            <Form>
                <Button type="submit" outline color="warning">Limpar Formulário</Button>
            </Form>
        </Container>
    );
};