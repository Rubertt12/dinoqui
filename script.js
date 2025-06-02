 
    const famosos = [
      { nome: "Tyrannosaurus Rex", imagem: "https://upload.wikimedia.org/wikipedia/commons/3/37/Tyrannosaurus_Rex_Holotype.jpg" },
      { nome: "Triceratops", imagem: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Triceratops_mounted.jpg" },
      { nome: "Velociraptor", imagem: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Velociraptor_dinoguy2.jpg" },
      { nome: "Brachiosaurus", imagem: "https://upload.wikimedia.org/wikipedia/commons/8/84/Brachiosaurus_20150314_125529.jpg" },
      { nome: "Stegosaurus", imagem: "https://upload.wikimedia.org/wikipedia/commons/f/f4/Stegosaurus_BW.jpg" },
      { nome: "Spinosaurus", imagem: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Spinosaurus_Aegyptiacus_in_NHM.jpg" },
      { nome: "Ankylosaurus", imagem: "https://upload.wikimedia.org/wikipedia/commons/0/08/Ankylosaurus_magniventris.jpg" },
      { nome: "Allosaurus", imagem: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Allosaurus_mounted.jpg" },
      { nome: "Pteranodon", imagem: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Pteranodon_NT.jpg" },
      { nome: "Dilophosaurus", imagem: "https://upload.wikimedia.org/wikipedia/commons/5/58/Dilophosaurus_sculpture.jpg" },
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
