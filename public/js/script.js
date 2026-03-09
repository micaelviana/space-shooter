function removeMajor(id) {
  fetch(`/majors/remove/${id}`, { method: 'POST' }).then((response) => {
    if (response.ok) {
      console.log('Curso removido com sucesso')
      window.location.href = "/majors"
    } else {
      console.log('Erro ao remover curso')
      console.log(response.status)
    }
  })
}

function removeUser(id) {
  fetch(`/users/remove/${id}`, { method: 'POST' }).then((response) => {
    if (response.ok) {
      console.log('Usuário removido com sucesso')
      window.location.href = "/users"
    } else {
      console.log('Erro ao remover usuário')
      console.log(response.status)
    }
  })
}

function saveScore(score) {
  fetch(`/users/saveScore/${score}`, {
    method: 'POST',
  })
    .then((response) => {
      if (response.ok) {
        console.log('Pontuação salva com sucesso!');
      }
    })
    .catch((error) => {
      console.error('Erro ao salvar a pontuação:', error);
    });
}
