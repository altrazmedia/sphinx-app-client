import React, { PureComponent } from "react";


import { Button, Icon, Modal, Input, Select } from "components/common";

class Sandbox extends PureComponent {

  state = {
    modal1: false,
    select1: "",
    select2: ""
  }

  openModal = (modal) => () => {
    this.setState({ [modal]: true })
  }

  closeModal = (modal) => () => {
    this.setState({ [modal]: false })
  }


  render = () => {

    return (
      <React.Fragment>
        <h1>H1 heading</h1>
        <h2>H2 heading</h2>
        <h3>H3 heading</h3>
        <h4>H4 heading</h4>

        <Button.Group>
          <Button color="default">Primary</Button>
          <Button color="primary">Primary</Button>
          <Button color="secondary">Secondary</Button>
          <Button color="success">Success</Button>
          <Button color="error">Error</Button>
          <Button disabled>Disabled</Button>
        </Button.Group>

        <Button.Group>
          <Button variant="text" color="default">Primary</Button>
          <Button variant="text" color="primary">Primary</Button>
          <Button variant="text" color="secondary">Secondary</Button>
          <Button variant="text" color="success">Success</Button>
          <Button variant="text" color="error">Error</Button>
          <Button variant="text" disabled>Disabled</Button>
        </Button.Group>

        <Button.Group>
          <Button variant="icon" icon="burn" color="default" />
          <Button variant="icon" icon="burn" color="primary" />
          <Button variant="icon" icon="burn" color="secondary" />
          <Button variant="icon" icon="burn" color="error" />
          <Button variant="icon" icon="burn" color="success" />
        </Button.Group>

        <div>
          <h1>Icons</h1>
          <h3>Small</h3>
          <Icon size="small" name="user-ninja" />
          <Icon size="small" name="bomb" color="error" />
          <Icon size="small" name="bowling-ball" color="primary" />
          <h3>Default</h3>
          <Icon name="user-ninja" />
          <Icon name="bomb" color="error" />
          <Icon name="bowling-ball" color="primary" />
          <h3>Big</h3>
          <Icon size="big" name="user-ninja" />
          <Icon size="big" name="bomb" color="error" />
          <Icon size="big" name="bowling-ball" color="primary" />
        </div>


        <h1>Modals</h1>
        <Button.Group>
          <Button onClick={this.openModal("modal1")}>Open modal</Button>
        </Button.Group>
        <Modal isOpen={this.state.modal1} close={this.closeModal("modal1")} title="Example modal">
          <Modal.Content>
            <p>
              Wymianę zdań przerywa pojawienie się wykwintnie ubranej i niezwykle urodziwej kobiety – jest to Telimena. Ona tymczasem przywitawszy się ze wszystkimi zajmuje miejsce obok Tadeusza. Młodzieńcowi zdawało się, że rozpoznaje w niej spotkaną rano mieszkankę jego dawnego pokoju. Patrzył więc z tym większym zainteresowaniem, a i ona nie pozostawała na te spojrzenia obojętną. W końcu zaczęła z nim rozmowę.
              <br />
              Tymczasem w drugim końcu stołu rozgorzał na dobre spór Asesora z Rejentem o to, czyj chart upolował zająca. Towarzystwo podzieliło się na stronników Sokoła (pies Asesora) i Kusego (pies Rejenta). Spór stara się załagodzić Podkomorzy, proponując urządzenie polowania na zająca pod wodzą Wojskiego. Ten jednak odmawia przewodnictwa, wykładając zgromadzonym, że zając nie jest zwierzęciem godnym organizowania takiej wyprawy. Tym samym wyśmiewa spór Asesora i Rejenta.
              <br />
              Wszyscy rozweseleni odchodzą od stołów. Tadeusz prowadzi Telimenę, o której już wie od Asesora, że jest jego ciotką. Wiadomość ta zasmuciła i rozdrażniła młodzieńca. Chciałby dowiedzieć się czegoś więcej, nie było jednak kogo zapytać, gdyż goście udali się na spoczynek.
              <br />
              W końcowej partii księgi przeciwstawia narrator śpiący, a więc spokojny dworek szlachecki niepewnemu losowi żołnierzy, walczących u boku Napoleona. Dowiadujemy się, że wielu z nich pozostawia domy rodzinne i przedziera się do Księstwa Warszawskiego, aby móc wstąpić do armii lub zostać emisariuszem. W Panu Tadeuszu takim emisariuszem jest ksiądz Robak. Istotnie pojawia się on teraz o tak późnej porze i budzi Sędziego, aby poinformować go o czymś. Narrator nie ujawnia jednak treści rozmowy.
            </p>
          </Modal.Content>
          <Modal.Buttons>
            <Button variant="text" onClick={this.closeModal("modal1")}>Close</Button>
            <Button onClick={this.closeModal("modal1")} >OK!</Button>
          </Modal.Buttons>
        </Modal>

        <div>
          <h1>Inputs</h1>
          <Input
            icon="envelope"
            type="email"
          />

          <Input
            icon="user-nurse"
            type="text"
            error="Contact a doctor"
          />

          <Input
            icon="stop-circle"
            type="text"
            placeholder="Disabled"
            disabled
          />

          <Input
            icon="broom"
            type="text"
            fullWidth
            placeholder="Brooooom"
          />

          <Input
            type="password"
            fullWidth
          />

        </div>

        <h1>Select</h1>
        <Select 
          placeholder="Select"
          value={this.state.select1}
          options={[
            { value: "a", text: "Afganistan" },
            { value: "b", text: "Belgia" },
            { value: "c", text: "Cypr" },
          ]}
          onChange={value => this.setState({ select1: value })}
        />
        <Select 
          fullWidth
          placeholder="Fullwidth Select"
          value={this.state.select2}
          options={[
            { value: "a", text: "Afganistan" },
            { value: "b", text: "Belgia" },
            { value: "c", text: "Cypr" },
          ]}
          onChange={value => this.setState({ select2: value })}
        />

      </React.Fragment>
    )

  }

}

export default Sandbox;