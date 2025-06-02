 
    const famosos = [
      { nome: "Tyrannosaurus Rex", imagem: "https://s2.glbimg.com/oD9XFZo12kp8v6OGIbIPemfkpGw=/e.glbimg.com/og/ed/f/original/2017/10/26/tiranossauro.jpg" },
      { nome: "Triceratops", imagem: "https://revistaplaneta.com.br/wp-content/uploads/sites/3/2021/10/dino1.jpg" },
      { nome: "Velociraptor", imagem: "https://ichef.bbci.co.uk/ace/ws/640/amz/worldservice/live/assets/images/2015/07/16/150716185514_zhenyuanlongbyzhaochuang1.jpg.webp" },
      { nome: "Brachiosaurus", imagem: "https://www.atlasvirtual.com.br/jpg/braquiossauro1.jpg" },
      { nome: "Stegosaurus", imagem: "https://cdn.britannica.com/59/242659-050-75430D8A/Outdoor-statue-of-Stegosaurus-dinosaur.jpg" },
      { nome: "Spinosaurus", imagem: "https://as2.ftcdn.net/v2/jpg/00/23/56/11/1000_F_23561153_wDQryoYZI7LUN6vh0i0oJE87NleLZVGM.jpg" },
      { nome: "Ankylosaurus", imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGnQHlW_7ufn3D-qI_nNao6Em-fPCpFm83jw&s" },
      { nome: "Allosaurus", imagem: "https://static.wikia.nocookie.net/jurassicworld-evolution/images/a/ab/Allosaurus_JWE2_Profile.png/revision/latest?cb=20220601223404" },
      { nome: "Pteranodon", imagem: "https://media.istockphoto.com/id/1004753634/pt/foto/pteranodon-scene-3d-illustration.jpg?s=612x612&w=0&k=20&c=ducafmLu19QOb1Xaao0TeKMWA7wFSKsZKYdxtnczLmA=" },
      { nome: "Dilophosaurus", imagem: "https://static.wikia.nocookie.net/jurassicpark/images/e/ef/Dilophosaurus_Render.png/revision/latest?cb=20240818222202" },
    ];

    const TOTAL_PERGUNTAS = 10;
    let dinos = [];
    let indiceAtual = 0;
    let pontos = 0;

    function embaralhar(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    function atualizarBarraProgresso() {
      const progresso = ((indiceAtual / TOTAL_PERGUNTAS) * 100).toFixed(2);
      document.getElementById("progress-bar").style.width = progresso + "%";
    }

    function mostrarPergunta() {
      if (indiceAtual >= TOTAL_PERGUNTAS) return mostrarResultado();

      atualizarBarraProgresso();
      document.getElementById("feedback").textContent = "";

      const dino = dinos[indiceAtual];
      document.getElementById("dino-img").src = dino.imagem;
      document.getElementById("dino-img").alt = `Imagem do ${dino.nome}`;

      const opcoes = [dino.nome];
      while (opcoes.length < 4) {
        const aleatorio = famosos[Math.floor(Math.random() * famosos.length)].nome;
        if (!opcoes.includes(aleatorio)) opcoes.push(aleatorio);
      }

      const opcoesEmbaralhadas = embaralhar(opcoes);
      const container = document.getElementById("options");
      container.innerHTML = "";
      opcoesEmbaralhadas.forEach((opcao) => {
        const btn = document.createElement("button");
        btn.className = "option";
        btn.textContent = opcao;
        btn.onclick = () => verificarResposta(opcao);
        container.appendChild(btn);
      });
    }

    function verificarResposta(resposta) {
      const correta = dinos[indiceAtual].nome;
      const feedback = document.getElementById("feedback");
      if (resposta === correta) {
        pontos++;
        feedback.textContent = "✔️ Correto!";
        feedback.className = "feedback correct";
      } else {
        feedback.textContent = `❌ Errado! Era: ${correta}`;
        feedback.className = "feedback wrong";
      }
      indiceAtual++;
      setTimeout(mostrarPergunta, 800);
    }

    function mostrarResultado() {
      const result = document.getElementById("result");
      let texto = `Você acertou ${pontos} de ${TOTAL_PERGUNTAS}!`;
      if (pontos === TOTAL_PERGUNTAS) texto += "<br>👑 Primeiro lugar com Coroa!";
      else if (pontos >= 8) texto += "<br>🥈 Segundo lugar!";
      else if (pontos >= 5) texto += "<br>🥉 Terceiro lugar!";
      result.innerHTML = texto;
      document.getElementById("options").innerHTML = "";
      document.getElementById("restart-btn").style.display = "inline-block";
    }

    function reiniciarJogo() {
      indiceAtual = 0;
      pontos = 0;
      document.getElementById("result").innerHTML = "";
      document.getElementById("restart-btn").style.display = "none";
      iniciarJogo();
    }

    function iniciarJogo() {
      dinos = embaralhar(famosos).slice(0, TOTAL_PERGUNTAS);
      mostrarPergunta();
    }

    iniciarJogo();
