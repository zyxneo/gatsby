// @flow

import React from 'react'
// import Link from 'gatsby-link';

import {
  Container,
  Grid,
  Header,
  List,
  Image,
  Modal,
} from 'semantic-ui-react'

import './slideshow.css';

type SlideshowImage = {
  src: string
}

type SlideshowProps = {
  items: Array<SlideshowImage>,
  item: SlideshowImage,
  selectedIndex: Number,
  title: string,
  alias: string,
}

type State = {
  selectedIndex: Number
}

const inlineStyle = {
  modal : {
    marginTop: '0px !important',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
};

class Slideshow extends React.PureComponent<SlideshowProps, State> {
  state = {
    selectedIndex: this.props.selectedIndex || 0
  };

  setSelected = (id: Number) => {
    this.setState({ selectedIndex: id });
  }

  render() {
    const { selectedIndex } = this.state;
    const {
      item,
      items,
      title,
      alias
    } = this.props;

    const selectedItem = items[selectedIndex]
    return (
      <Modal
        trigger={
          <Image
            src={`/images/projects/${alias}/${item.src}`}
            as='a'
            className="thumbnail"
          />
        }
        closeIcon
        style={inlineStyle.modal}
      >
        <Modal.Header>
          <Header>{title} - {selectedItem.title}</Header>
        </Modal.Header>
        <Modal.Content image scrolling>
          <Container textAlign='center' className="slideshow content">
            <Image className="slideshow" src={`/images/projects/${alias}/${selectedItem.src}`} />
            <div className="slideshow desc" dangerouslySetInnerHTML={{__html: selectedItem.desc}} />
          </Container>
        </Modal.Content>
        <Modal.Actions textAlign='center'>
          <Container textAlign='center'>
            <Image.Group size='tiny'>
            {
              items && items.map((item, index) => (
                <Image
                  src={`/images/projects/${alias}/${item.src}`}
                  key={item.src}
                  as='a'
                  onClick={() => (this.setSelected(index))}
                  className={(index === selectedIndex) ? 'slideshow thumbnail selected' : 'slideshow thumbnail deselected'}
                />
              ))
            }
            </Image.Group>
          </Container>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default Slideshow
