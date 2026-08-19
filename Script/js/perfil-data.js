// Define o perfil padrão como "Joaquim"
const perfilAtivoInicial = localStorage.getItem("perfilAtivo") || "Joaquim";
localStorage.setItem("perfilAtivo", perfilAtivoInicial);

// Define os perfis com dados armazenados no localStorage
const perfis = {
  Joaquim: {
    nome: "Joaquim",
    foto: "https://lh3.googleusercontent.com/a/ACg8ocLpXZvBbDwFEp6ncRTMPzKMYp-6rvFfrge-pgHri1z_V4DOIZGg=s83-c-mo",
    bio: localStorage.getItem("bioJoaquim") || "O Criador e Investidor",
    genero: localStorage.getItem("generoJoaquim") || "masculino",
    anoNascimento: parseInt(localStorage.getItem("anoNascimentoJoaquim")) || 2008,
    altura: parseFloat(localStorage.getItem("alturaJoaquim")) || 1.75, // metros
    peso: parseFloat(localStorage.getItem("pesoJoaquim")) || 69,       // kg
    nivel: parseInt(localStorage.getItem("nivelJoaquim")) || 1,
    xp: parseInt(localStorage.getItem("xpJoaquim")) || 0,
    musicPlaceNotes1: localStorage.getItem("musicPlaceNotes1-Joaquim") || "",
    melodyStat: parseInt(localStorage.getItem("melodyStat-Joaquim")) || 0,
    gymNotes: localStorage.getItem("gymNotes-Joaquim") || "",
    gymStat: parseInt(localStorage.getItem("gymStat-Joaquim")) || 0, 
    anotacoes: localStorage.getItem("anotacoes-Joaquim") || "",
  }
};

let perfilAtivo = perfilAtivoInicial;
