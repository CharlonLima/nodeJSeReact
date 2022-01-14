import axios, { Axios } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container } from "reactstrap";
import { Table } from "reactstrap";
import { api } from "../../../config";
// Tudo que for usado deve ser importado, quando começar a escrever a palavra
// pressione enter e a importação da dependencia será feita automaticamente
export const ListarClientes = () => {
    const [data, setData] = useState([]); //retorna uma lista por isso tem colcetes
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getListarClientes = async () => {
        // api é a porta http://localhost:3001 que foi definida no controller.js
        // e está sendo exportada na pasta config no arquivo index.js e importada
        //para cá. "/listaservicos" é o é o nome da rota que foi definido no controller.js
        await axios.get(api + "/listaclientes")
            .then((response) => {
                console.log(response.data.clientes);
                setData(response.data.clientes);
                // retorna item porque lá no controller react
                // e no postman ciclo4 ele está retornando item
            }).catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API'
                })
            })
    }
    // chama a função
    useEffect(() => {
        getListarClientes();
    }, []);//[] cria uma lista com base no id
    // [] para que o codigo pare de ser executado

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div>
                        <h1>Lista com Todos os Clientes</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="/cadastrarCliente" className="btn btn-outline-primary btn-sm">Cadastrar Cliente</Link>
                    </div>
                    {/* Funciona como se fosse um if, 
                se o status type for igual a error então execute o alert
                se for falso que está sendo representado pelo dois pontos
                 execute o vazio ou seja nada */}
                    {status.type == 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}
                </div>
            </Container>
            {/* striped é formatação de estilo da tabela */}
            <Table striped>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Cidade</th>
                        <th>UF</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(clientes => (
                        // ServicoId, PedidoId, quantidade, valor para que ele retorne 
                        // deve estar escrito igual ele retorna no postman
                        <tr key={clientes.id}>
                            <td>{clientes.nome}</td>
                            <td>{clientes.endereco}</td>
                            <td>{clientes.uf}</td>
                            <td className="text-center/">
                                {/* vai mandar para a rota que está em app.js junto com o id do serviço */}
                                <Link to={""}
                                    className="btn btn-outline-primary btn-sm">Consultar</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};