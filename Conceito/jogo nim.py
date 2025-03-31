def partida():
    a=1
    x=1
    n=int(input("Quantas peças? "))
    m=int(input("Limite de peças por jogada? "))
    jogador=1
    if n%(m+1):
        print("Computador começa!")
        jogador="computador"
    else:
        print("Você começa!")
        jogador="usuario"
    while n > 0:
        if jogador=="computador":
            a=int(computador_escolhe_jogada(n, m))
            n=n-a
            if a==1:
                print()
                print("O computador tirou uma peça.")
            else:
                print()
                print("O computador tirou", a,"peças.")
            if n==1:
                print("Agora resta apenas uma peça no tabuçeiro.")
            else:
                print("Agora restam", n ,"peças no tabuleiro.")
            jogador="usuario"
            último="computador"
        else:
            x=int(usuario_escolhe_jogada(n, m))
            n=n-x
            if x==1:
                print()
                print("Você tirou uma peça.")
            else:
                print()
                print("Você tirou",x,"peças")
            if n==1:
                print("Agora resta apenas uma peça no tabuleiro.")
            else:
                print("Agora restam", n ,"peças no tabuleiro.")
            jogador="computador"
            último="usuário"

    if último=="computador":
        print()
        print('Fim do jogo! O computador ganhou!')
    else:
        print()
        print("Fim de jogo! o usuário ganhou!")

def usuario_escolhe_jogada(n, m):
    x=0
    while x > m or x<=0 or x > n:
        print()
        x=int(input("Quantas peças você vai tirar? "))
        if x > m or x<=0 or x > n:
            print()
            print("Oops! Jogada inválida! Tente de novo.")
    return x


def computador_escolhe_jogada(n, m):
        a=1
        while(a<=m):
            if(n-a)%(m+1)==0:
                return a
            else:
                a=a+1

        if(n-a)%(m+1)!=0:
            return m

def campeonato():
    for r in range(1, 4):
        print()
        print(f'**** Rodada {r} ****')

        partida()

decisão=int(input('''Bem-vindo ao jogo do NIM! Escolha:


1 - para jogar uma partida isolada

2 - para jogar um campeonato

'''))
if decisão==1:
    partida()
else:
    campeonato()
    print()
    print('Placar: Você 0 X 3 Computador')