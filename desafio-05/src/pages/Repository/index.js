import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

import api from '../../services/api';

import Container from '../../components/Container'
import { Loading, Owner, IssueList, IssueFilter, Pagination } from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  }

  state = {
    repository: {},
    issues: [],
    loading: true,
    filter: 'open',
    page: 1
  };

  async componentDidMount(){
    const {match} = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    })
  }

  handleFilter = async e => {
    const { match } = this.props;

    const filter = e.target.value;
    const repoName = decodeURIComponent(match.params.repository);

    const issues = await api.get(`/repos/${repoName}/issues`, {
        params: { state: filter, per_page: 5, },
    })

    this.setState({
      issues: issues.data,
      loading: false,
      filter,
      page: 0,
    })
  }

  handlePagination = async (e, page) => {
    const { match } = this.props;
    const {filter} = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const issues = await api.get(`/repos/${repoName}/issues`, {
        params: { state: filter, per_page: 5, page },
    })

    this.setState({
      issues: issues.data,
      loading: false,
      page
    })
  }

  render(){
    const {repository, issues, loading, page} = this.state;

    if(loading){
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueFilter onChange={e => this.handleFilter(e)}>
          <option value="open">Em aberto</option>
          <option value="closed">Fechada</option>
          <option value="all">Todas</option>
        </IssueFilter>

        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>

        <Pagination>
          {issues.length === 0 &&
            <small>Não há dados</small>
          }

          {page > 1 ? (
              <button onClick={e => this.handlePagination(e, page - 1)}>
                <FaArrowLeft color="#FFF" size={14} />
              </button>
            ) : (
              <div></div>
            )
          }

          {issues.length > 0 ? (
              <button onClick={e => this.handlePagination(e, page + 1)}>
                <FaArrowRight color="#FFF" size={14} />
              </button>
            ) : (
              <div></div>
            )
          }

        </Pagination>
      </Container>
    )
  }
}
