import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Flex } from 'core/styled';
import { FileInput, Tag } from '@blueprintjs/core';

function MoAttachments({ files, disabled, uploadFileRequest, deleteFileRequest, isUploading }) {
  const handleInputChange = (e) => {
    uploadFileRequest(e.target.files[0]);
  };
  const handleDeleteFile = name => () => {
    deleteFileRequest(name);
  };
  return (
    <Flex fdc>
      {files.length > 0 && (
        <Flex marginBottom={10}>
          {files.map(q => (
            <Tag onRemove={handleDeleteFile(q.name)} key={q.name}>{q.name}</Tag>
          ))}
        </Flex>
      )}
      <FileInput
        style={{ width: 220 }}
        disabled={disabled || isUploading}
        inputProps={{ accept: '.pdf' }}
        text={isUploading ? 'Uploading...' : 'Choose PDF file...'}
        onInputChange={handleInputChange}
      />
    </Flex>
  );
}

MoAttachments.propTypes = {
  files: PropTypes.array.isRequired,
  uploadFileRequest: PropTypes.func.isRequired,
  deleteFileRequest: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  isUploading: PropTypes.bool,
};

const mapStateToProps = ({ moAttachments }) => ({
  files: moAttachments.files,
  isUploading: moAttachments.isUploading,
});

const mapDispatchToProps = ({ moAttachments: { uploadFileRequest, deleteFileRequest } }) => ({
  uploadFileRequest,
  deleteFileRequest,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MoAttachments);
