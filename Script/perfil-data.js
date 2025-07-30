// Define o perfil padrão como "Main"
const perfilAtivoInicial = localStorage.getItem("perfilAtivo") || "Main";
localStorage.setItem("perfilAtivo", perfilAtivoInicial);

// Define os perfis com dados armazenados no localStorage
const perfis = {
  Joaquim: {
    nome: "Joaquim",
    bio: localStorage.getItem("bioJoaquim") || "O Criador e Investidor",
    nivel: parseInt(localStorage.getItem("nivelJoaquim")) || 1,
    xp: parseInt(localStorage.getItem("xpJoaquim")) || 0,
    notesLer: localStorage.getItem("notes-ler-Joaquim") || "",
    musicPlaceNotes1: localStorage.getItem("musicPlaceNotes1-Joaquim") || "",
    gymNotes: localStorage.getItem("gymNotes-Joaquim") || "",
    complaints: JSON.parse(localStorage.getItem("complaints-Joaquim")) || [], // Adicionando as reclamações para o perfil Joaquim
    notas: localStorage.getItem("notas-Joaquim") || "", // Adicionando o campo de notas para o perfil Joaquim
    pagarNotas: localStorage.getItem("pagarNotas-Joaquim") || "", // Adicionando o campo de pagarNotas para o perfil Joaquim
    gameNotes: localStorage.getItem("gameNotes-Joaquim") || "" // Adicionando o campo de gameNotes para o perfil Joaquim
  },
  Vitoria: {
    nome: "Vitória",
    bio: localStorage.getItem("bioVitoria") || "Irmã mais nova",
    nivel: parseInt(localStorage.getItem("nivelVitoria")) || 1,
    xp: parseInt(localStorage.getItem("xpVitoria")) || 0,
    notesLer: localStorage.getItem("notes-ler-Vitoria") || "",
    musicPlaceNotes1: localStorage.getItem("musicPlaceNotes1-Vitoria") || "",
    gymNotes: localStorage.getItem("gymNotes-Vitoria") || "",
    complaints: JSON.parse(localStorage.getItem("complaints-Vitoria")) || [], // Adicionando as reclamações para o perfil Vitória
    notas: localStorage.getItem("notas-Vitoria") || "", // Adicionando o campo de notas para o perfil Vitória
    pagarNotas: localStorage.getItem("pagarNotas-Vitoria") || "", // Adicionando o campo de pagarNotas para o perfil Vitória
    gameNotes: localStorage.getItem("gameNotes-Vitoria") || "" // Adicionando o campo de gameNotes para o perfil Vitória
  },
  Main: {
    nome: "Main",
    bio: localStorage.getItem("bioMain") || "Perfil principal",
    nivel: parseInt(localStorage.getItem("nivelMain")) || 1,
    xp: parseInt(localStorage.getItem("xpMain")) || 0,
    notesLer: localStorage.getItem("notes-ler-Main") || "",
    musicPlaceNotes1: localStorage.getItem("musicPlaceNotes1-Main") || "",
    gymNotes: localStorage.getItem("gymNotes-Main") || "",
    complaints: JSON.parse(localStorage.getItem("complaints-Main")) || [], // Adicionando as reclamações para o perfil Main
    notas: localStorage.getItem("notas-Main") || "", // Adicionando o campo de notas para o perfil Main
    pagarNotas: localStorage.getItem("pagarNotas-Main") || "", // Adicionando o campo de pagarNotas para o perfil Main
    gameNotes: localStorage.getItem("gameNotes-Main") || "" // Adicionando o campo de gameNotes para o perfil Main
  }
};

let perfilAtivo = perfilAtivoInicial;
