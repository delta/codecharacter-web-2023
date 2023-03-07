import { FormGroup, Col, Container, Row, Modal, Form } from 'react-bootstrap';
import styles from './EditorSettings.module.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  isSettingsOpened,
  fontSizeChanged,
  themeChanged,
  IsSettingsOpen,
  FontSize,
  Theme,
  Autocomplete,
  autoCompleteChanged,
} from '../../store/EditorSettings/settings';

const EditorSettings = (): JSX.Element => {
  const isSettingsOpen = useAppSelector(IsSettingsOpen);
  const fontSize = useAppSelector(FontSize);
  const theme = useAppSelector(Theme);

  const dispatch = useAppDispatch();
  const autocomplete = useAppSelector(Autocomplete);

  const fontSizeOptions = [];
  for (let i = 8; i <= 40; i += 2) {
    fontSizeOptions.push(i);
  }

  const editorThemes = ['vs-light', 'vs-dark', 'high-contrast-black'];

  function handleFontSizeChange(newFontSize: number) {
    dispatch(fontSizeChanged(newFontSize));
  }

  function handleThemeChange(newTheme: string) {
    dispatch(themeChanged(newTheme));
  }

  const handleAutocompleteChange = () => {
    dispatch(autoCompleteChanged(!autocomplete));
  };

  return (
    <Modal
      show={isSettingsOpen}
      centered
      onHide={() => dispatch(isSettingsOpened(false))}
    >
      <Modal.Header className={styles.editorSettingsHeader}>
        <Modal.Title className={styles.headerText}>Settings</Modal.Title>
        <button
          type="button"
          className="btn-close btn-close-white"
          aria-label="Close"
          onClick={() => dispatch(isSettingsOpened(false))}
        ></button>
      </Modal.Header>

      <Modal.Body className={styles.editorSettingsBody}>
        <Container fluid>
          <Row>
            <Col xs={12} className={styles.settingFormGroup}>
              <FormGroup controlId="fontSize">
                <div className={styles.settingLabel}>Font Size</div>
                <select
                  className={styles.settingDropdown}
                  value={fontSize}
                  onChange={e => handleFontSizeChange(Number(e.target.value))}
                >
                  {fontSizeOptions.map((font: number) => (
                    <option
                      value={font}
                      key={font}
                      className={styles.optionsDropdown}
                    >
                      {font}
                    </option>
                  ))}
                </select>
              </FormGroup>
            </Col>

            <Col xs={12} className={styles.settingFormGroup}>
              <FormGroup controlId="editorTheme">
                <div className={styles.settingLabel}>Editor Theme</div>
                <select
                  className={styles.settingDropdown}
                  value={theme}
                  onChange={e => {
                    handleThemeChange(e.target.value);
                  }}
                >
                  {editorThemes.map((themeValue: string) => (
                    <option
                      value={themeValue}
                      key={themeValue}
                      className={styles.optionsDropdown}
                    >
                      {themeValue}
                    </option>
                  ))}
                </select>
              </FormGroup>
            </Col>

            <Col xs={12}>
              <div className={styles.autocompletediv}>
                <div className={styles.autocompleteLabel}>Intellisense</div>
                <div className={styles.autocompletebtn}>
                  <Form.Switch
                    id="autocompleteSwitch"
                    onChange={handleAutocompleteChange}
                    checked={autocomplete}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default EditorSettings;
