import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa'
import {Link} from 'react-router-dom'

import Container from '../../components/Container'
import { Form, SubmitButton, List, Field } from './styles';
import api from '../../services/api'

export default class Main extends Component {
  state = {
    newRepo: '',//'Rocketseat/bootcamp-gostack-desafio-05',
    repositories: [],
    loading: false,
    error: false,
  };

  // Carregar os dados do localStorage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  };

  // Salvar os dados do localStorage
  componentDidUpdate(_, prevState){
    const {repositories} = this.state;

    if(prevState.repositories !== repositories){
      localStorage.setItem('repositories', JSON.stringify(repositories))
    }
  }

  handleInputChange(e) {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    const { newRepo, repositories } = this.state;

    try {
      if(repositories.filter(repo => repo.name === newRepo).length !== 0){
        throw new Error('Repositório duplicado');
      }

      const response = await api.get(`/repos/${newRepo}`)

      const data = {
        name: response.data.full_name,
      }

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',//'Rocketseat/bootcamp-gostack-desafio-06',
        loading: false,
        errorField: false,
      })
    } catch (error) {
      this.setState({
        errorField: true,
        errorFieldMsg: error.response ? error.response.data.message : error.message,
        loading: false,
      })
    }
  }

  render() {
    const { newRepo, loading, repositories, errorField, errorFieldMsg } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
      </h1>

        <Form onSubmit={this.handleSubmit}>
          <Field
            type="text"
            placeholder="Adicionar repositório"
            onChange={(e) => this.handleInputChange(e)}
            value={newRepo}
            error={errorField}
          />

          <SubmitButton loading={loading ? 1 : 0}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
                <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>

          {errorField &&
              <p>{errorFieldMsg}</p>
          }
        </Form>

        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>

      </Container >
    );
  }
}
