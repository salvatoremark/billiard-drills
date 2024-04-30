import React from "react";

export default function ButtonGroup(props) {
  let cancelButton,
    primaryButton,
    secondaryButton = null;

  if (props.cancelAction) {
    cancelButton = (
      <button type='button' className='btn-cancel' onClick={props.cancelAction}>
        {props.cancelLabel}
      </button>
    );
  }
  if (props.primaryAction) {
    primaryButton = (
      <button
        type='button'
        className='btn-primary'
        onClick={props.primaryAction}>
        {props.primaryLabel}
      </button>
    );
  }
  if (props.secondaryAction) {
    secondaryButton = (
      <button
        type='button'
        className='btn-secondary'
        onClick={props.secondaryAction}>
        {props.extraLabel}
      </button>
    );
  }

  return (
    <div className='button-group'>
      {cancelButton}
      {secondaryButton}
      {primaryButton}
    </div>
  );
}
